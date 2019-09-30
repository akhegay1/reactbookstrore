// src/js/components/List.js
import React from "react";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { colors: state.colors };
};


const ConnectedList = ({ colors }) => (
  <ul className="list-group list-group-flush">
    {colors.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.title}
      </li>
    ))}
  </ul>
);
const List = connect(mapStateToProps)(ConnectedList);
export default List;