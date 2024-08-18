import { Button, Result } from "antd";
import { useRouteError, Link } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary">
          <Link to={"/"}>
            <span>Go to homepage</span>
          </Link>
        </Button>
      }
    />
  );
}
