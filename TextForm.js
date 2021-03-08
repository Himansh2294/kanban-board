import React from "react";

const TextForm = (props) => {
  const classes = {
    styledForm: {
      background: "white",
      width: "88%",
      height: "34px",
      border: "none",
      fontSize: "18px",
    },
  };
  let form;
  const onSubmit = (event) => {
    form = event.target;
    event.preventDefault();
    props.onSubmit(form.input.value);
    form.reset();
  };

  return (
    <form onSubmit={onSubmit} ref={(node) => (form = node)}>
      <input
        style={classes.styledForm}
        type="text"
        className="TextForm__input"
        name="input"
        placeholder={props.placeholder}
      />
    </form>
  );
};

export default TextForm;
