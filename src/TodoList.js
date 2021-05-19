import React from "react";
import { FaEdit, FaCheck, FaTrash, FaCircle } from "react-icons/fa";
import styled from "styled-components";
import TagsInput from "./Components/Tags/TagsInput";

const TodoList = ({ items, editItem, removeItem, checkedItem }) => {
  // console.log(items.reverse());
  // console.log(items);

  const selectedTags = (tags) => {
    console.log(tags);
  };
  return (
    <Wrapper>
      <div className="grocery-list">
        {items.map((item) => {
          const { title, id } = item;
          return (
            <>
              <article className="grocery-item" key={id}>
                <div className="title-container">
                  <button className="check-box" onClick={() => checkedItem(id)}>
                    <FaCircle className="circle" />
                  </button>
                  <p className="list-title">{title}</p>
                </div>
                <div className="btn-container">
                  <button className="edit-btn " onClick={() => editItem(id)}>
                    <FaEdit>
                      <span>edit todo</span>
                    </FaEdit>
                  </button>
                  <button
                    className="delete-btn "
                    onClick={() => removeItem(id)}
                  >
                    <FaTrash />
                    <span>remove </span>
                  </button>
                </div>
              </article>
              <TagsInput selectedTags={selectedTags} tags={[]} />
            </>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .title-container {
    display: flex;
  }
`;

export default TodoList;
