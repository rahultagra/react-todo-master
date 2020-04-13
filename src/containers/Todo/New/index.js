import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { todoNewSelector } from "store/selectors";
import { addTodo } from "store/actions/todo";
import { Header } from "components/layout";
import { TodoForm } from "components/Todo";

const mapStateToProps = state => todoNewSelector(state);

const mapDispatchToProps = dispatch => ({
  addNewTodo: newTodo => dispatch(addTodo(newTodo))
});

const TodoNew = props => {
  const { totalTodosToday, addNewTodo, viewAll } = props;
  const subtitle = `${totalTodosToday} task${
    totalTodosToday !== 1 ? "s" : ""
  } for today`;

  return (
    <Fragment>
      <Header title="New Task" subtitle={subtitle} invert viewAll={viewAll} />
      <TodoForm addNewTodo={addNewTodo} viewAll={viewAll} />
    </Fragment>
  );
};

TodoNew.propTypes = {
  totalTodosToday: PropTypes.number.isRequired,
  addNewTodo: PropTypes.func.isRequired,
  viewAll: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoNew);
