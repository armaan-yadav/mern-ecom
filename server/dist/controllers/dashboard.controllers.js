import { nodeCache } from "../index.js";
import { tryCatch } from "../middlewares/erorr.midddlewares.js";
import { Order } from "../models/order.models.js";
import { Product } from "../models/product.models.js";
import { User } from "../models/user.models.js";
import { calculatePercentage, invalidateCache, responseHandler, } from "../utils/features.js";
export const getDashboardStats = tryCatch(async (req, res, next) => {
    let stats = {};
    if (nodeCache.has("adminStats")) {
        stats = JSON.parse(nodeCache.get("adminStats"));
    }
    else {
        // declare the dates for stats
        const today = new Date();
        const thisMonth = {
            start: new Date(today.getFullYear(), today.getMonth(), 1),
            end: today,
        };
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const prevMonth = {
            start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
            end: new Date(today.getFullYear(), today.getMonth(), 0),
        };
        // this  month data
        const thisMonthProductsPromise = Product.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end,
            },
        });
        const thisMonthOrdersPromise = Order.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end,
            },
        });
        const thisMonthUsersPromise = User.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end,
            },
        });
        // last month data
        const prevMonthProductsPromise = Product.find({
            createdAt: {
                $gte: prevMonth.start,
                $lte: prevMonth.end,
            },
        });
        const prevMonthOrdersPromise = Order.find({
            createdAt: {
                $gte: prevMonth.start,
                $lte: prevMonth.end,
            },
        });
        const prevMonthUsersPromise = User.find({
            createdAt: {
                $gte: prevMonth.start,
                $lte: prevMonth.end,
            },
        });
        const lastSixMonthsPromise = Order.find({
            createdAt: {
                $gte: sixMonthsAgo,
                $lte: thisMonth.end,
            },
        });
        //count promises
        const totalProductsCount = Product.countDocuments({});
        const totalOrdersCount = Order.countDocuments({});
        const totalUsersCount = User.countDocuments({});
        //revenue promise
        //TODO learn about mongodb aggregate
        const totalRevenuePromise = Order.aggregate([
            { $group: { _id: null, total: { $sum: "$total" } } },
        ]);
        //latest orders promise
        // promise resolver
        const [thisMonthOrders, thisMonthProducts, thisMonthUsers, prevMonthOrders, prevMonthProducts, prevMonthUsers, usersCount, productsCount, ordersCount, totalRevenue, lastSixMonths,] = await Promise.all([
            thisMonthOrdersPromise,
            thisMonthProductsPromise,
            thisMonthUsersPromise,
            prevMonthOrdersPromise,
            prevMonthProductsPromise,
            prevMonthUsersPromise,
            totalUsersCount,
            totalProductsCount,
            totalOrdersCount,
            totalRevenuePromise,
            lastSixMonthsPromise,
        ]);
        //revenue  calculation
        //!total revenue
        const revenue = totalRevenue.reduce((total, curr) => total + curr.total, 0);
        //this month and prev revenue
        const thisMonthRevenue = thisMonthOrders.reduce((total, curr) => total + curr.total, 0);
        const prevMonthRevenue = prevMonthOrders.reduce((total, curr) => total + curr.total, 0);
        //calculate percentage
        const ordersPercentage = calculatePercentage(thisMonthOrders.length, prevMonthOrders.length);
        const productsPercentage = calculatePercentage(thisMonthProducts.length, prevMonthProducts.length);
        const usersPercentage = calculatePercentage(thisMonthUsers.length, prevMonthUsers.length);
        const revenuePercentage = calculatePercentage(thisMonthRevenue, prevMonthRevenue);
        //last six months data
        const orderMonthCounts = new Array(6).fill(0);
        const orderMonthlyRevenue = new Array(6).fill(0);
        lastSixMonths.map((order) => {
            const creationDate = order.createdAt;
            const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
            if (monthDiff < 6) {
                orderMonthCounts[6 - monthDiff - 1] += 1;
                orderMonthlyRevenue[6 - monthDiff - 1] += order.total;
            }
        });
        //append data
        stats = {
            percentage: {
                ordersPercentage,
                productsPercentage,
                usersPercentage,
                revenuePercentage,
            },
            count: { ordersCount, usersCount, productsCount },
            revenue: { totalRevenue: revenue, thisMonthRevenue, prevMonthRevenue },
            chart: {
                order: orderMonthCounts,
                revenue: orderMonthlyRevenue,
            },
        };
        await invalidateCache({});
        nodeCache.set("adminStats", JSON.stringify(stats));
        console.log("first");
    }
    return responseHandler(res, 200, "stats fetched successfully", { ...stats });
});
export const getOrderStats = tryCatch(async (req, res, next) => {
    let stats;
    if (nodeCache.has("orderStats")) {
        stats = JSON.parse(nodeCache.get("orderStats"));
    }
    else {
        const orders = await Order.find({}).select("status");
        let processing = 0, shipped = 0, delivered = 0;
        orders.map((order) => {
            switch (order.status) {
                case "delivered":
                    delivered += 1;
                    break;
                case "shipped":
                    shipped += 1;
                    break;
                default:
                    processing += 1;
                    break;
            }
        });
        stats = {
            processing,
            shipped,
            delivered,
        };
    }
    return responseHandler(res, 200, "Order stats fetched successfully", {
        ...stats,
    });
});
