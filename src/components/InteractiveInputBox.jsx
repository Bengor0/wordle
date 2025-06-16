import '.././styles/InteractiveInputBox.css'

const InteractiveInputBox = ({id, type, placeholder, ref}) => {
  return (
    <div className="input-box wrapper">
      <input required id={id} type={type} ref={ref}/>
      <label htmlFor={id}>
        {placeholder.split("").map((letter, index) => (
          <span
            className="input-box-span"
            key={index}
            style={{ "--index": index }}
          >
            {letter}
          </span>
        ))}
      </label>
    </div>
  );
};

export default InteractiveInputBox;
