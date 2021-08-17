import React from "react";
import Select from "react-select";

function CustomSelect(props) {
  let init = {}, value = {};
  if(props.defaultVal !== "" && props.options){
    init = props.options.find(ele => ele.value === props.defaultVal);
  }else if(props.options){
    init = props.options[0];
  }
  if(props.value !== "" && props.options){
    value = props.options.find(ele => ele.value === props.value);
  }
  const style = {
    control: (base) => ({
      ...base,
      boxShadow: "none",
      border: 0,
      backgroundColor: "#f7f7f7",
    }),
    option: (provided) => ({
      ...provided,
      color:  "#767676",
      fontStyle: "italic",
    }),
    singleValue: (provided) => {
      const fontStyle = "italic";
      return { ...provided, fontStyle };
    },
  };
  return (
    <div style={{ width: "150px" }}>
      {props.valtrue === "1" ? <Select
        styles={style}
        options={props.options}
        value={value}
        onChange={(val)=>{props.change(val)}}
        theme={(theme) => ({
            ...theme,
            colors: {
            ...theme.colors,
              primary25: 'lightblue',
              primary: 'lightgrey',
            },
          })}
        components={{
            IndicatorSeparator: () => null
          }}
      />: <Select
        styles={style}
        options={props.options}
        defaultValue={init}
        onChange={(val)=>{props.change(val)}}
        theme={(theme) => ({
            ...theme,
            colors: {
            ...theme.colors,
              primary25: 'lightblue',
              primary: 'lightgrey',
            },
          })}
        components={{
            IndicatorSeparator: () => null
          }}
      />}
      
    </div>
  );
}

export default CustomSelect;
