"""Job extraction logic for various job boards."""
import requests
from bs4 import BeautifulSoup
from typing import List, Dict, Any, Optional
import logging
from config import SCRAPER_CONFIG

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class JobExtractor:
    """Extract jobs from configured job boards."""
    
    def __init__(self, company: str):
        """Initialize with a specific company configuration."""
        if company not in SCRAPER_CONFIG:
            raise ValueError(f"Company {company} not supported. Available options: {list(SCRAPER_CONFIG.keys())}")
        
        self.company = company
        self.config = SCRAPER_CONFIG[company]
        self.session = requests.Session()
        
    def fetch_page(self, url: str = None) -> Optional[str]:
        """Fetch HTML content from a page."""
        target_url = url or self.config["base_url"]
        
        try:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
            response = self.session.get(target_url, headers=headers, timeout=30)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            logger.error(f"Error fetching {target_url}: {e}")
            return None
    
    def parse_jobs(self, html_content: str) -> List[Dict[str, Any]]:
        """Parse job listings from HTML content using configured selectors."""
        if not html_content:
            return []
        
        soup = BeautifulSoup(html_content, "html.parser")
        selectors = self.config["selectors"]
        jobs = []
        
        job_cards = soup.select(selectors["job_card"])
        logger.info(f"Found {len(job_cards)} job cards for {self.company}")
        
        for card in job_cards:
            try:
                title_element = card.select_one(selectors["job_title"])
                location_element = card.select_one(selectors["job_location"])
                link_element = card.select_one(selectors["job_link"])
                
                title = title_element.text.strip() if title_element else "No title"
                location = location_element.text.strip() if location_element else "No location"
                
                # Handle link extraction
                link = ""
                if link_element and link_element.has_attr("href"):
                    link = link_element["href"]
                    # Handle relative URLs
                    if link and not (link.startswith("http://") or link.startswith("https://")):
                        base_url = self.config["base_url"]
                        if base_url.endswith("/") and link.startswith("/"):
                            link = f"{base_url[:-1]}{link}"
                        elif not base_url.endswith("/") and not link.startswith("/"):
                            link = f"{base_url}/{link}"
                        else:
                            link = f"{base_url}{link}"
                
                job = {
                    "title": title,
                    "location": location,
                    "link": link,
                    "company": self.company
                }
                
                # Get job description if link is available and description selector is provided
                if link and selectors.get("job_description"):
                    job["description"] = self.extract_job_description(link)
                
                jobs.append(job)
                
            except Exception as e:
                logger.error(f"Error parsing job card: {e}")
                continue
                
        return jobs
    
    def extract_job_description(self, job_url: str) -> str:
        """Extract job description from job detail page."""
        html_content = self.fetch_page(job_url)
        if not html_content:
            return "Description unavailable"
        
        soup = BeautifulSoup(html_content, "html.parser")
        description_element = soup.select_one(self.config["selectors"]["job_description"])
        
        if description_element:
            return description_element.text.strip()
        return "Description unavailable"
    
    def get_jobs(self) -> List[Dict[str, Any]]:
        """Main method to get jobs from the configured job board."""
        html_content = self.fetch_page()
        if not html_content:
            logger.error(f"Failed to fetch jobs for {self.company}")
            return []
            
        return self.parse_jobs(html_content)


def scrape_all_jobs() -> Dict[str, List[Dict[str, Any]]]:
    """Scrape jobs from all configured job boards."""
    all_jobs = {}
    
    for company in SCRAPER_CONFIG:
        logger.info(f"Scraping jobs from {company}")
        try:
            extractor = JobExtractor(company)
            jobs = extractor.get_jobs()
            all_jobs[company] = jobs
            logger.info(f"Scraped {len(jobs)} jobs from {company}")
        except Exception as e:
            logger.error(f"Error scraping {company}: {e}")
            all_jobs[company] = []
    
    return all_jobs


if __name__ == "__main__":
    all_jobs = scrape_all_jobs()
    total_jobs = sum(len(jobs) for jobs in all_jobs.values())
    print(f"Scraped a total of {total_jobs} jobs")
    
    for company, jobs in all_jobs.items():
        print(f"\n{company.upper()}: {len(jobs)} jobs")
        for i, job in enumerate(jobs[:3], 1):  # Print first 3 jobs as a sample
            print(f"{i}. {job['title']} - {job['location']}")
        
        if len(jobs) > 3:
            print(f"...and {len(jobs) - 3} more jobs")
