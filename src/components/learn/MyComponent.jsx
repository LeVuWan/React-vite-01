import "./style.css";

const MyComponent = () => {
  // const QuangVu = "Wan Vũ";
  // const QuangVu = [12, 6, 7];
  const QuangVu = {
    name: "Wan Vũ",
    age: 22,
  };

  return (
    <>
      <div>{JSON.stringify(QuangVu)}</div>
      <div className="child" style={{ borderRadius: "10px" }}>
        123
      </div>
    </>
  );
};

export default MyComponent;
