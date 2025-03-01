import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { decrement, increment } from "@/redux/counter/counterSlice";

const CounterApp = () => {
  const { value } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -
      </Button>
      {value}
      <Button
        onClick={() => {
          dispatch(increment());
        }}
      >
        +
      </Button>
    </div>
  );
};

export default CounterApp;
