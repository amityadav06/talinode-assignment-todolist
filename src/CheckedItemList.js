import React from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

const CheckedItemList = ({ items }) => {
  return (
    <Wrapper>
      <div className="grocery-list">
        {items.map((item) => {
          const { title, id } = item;
          return (
            <article className="grocery-item  grocery-local" key={id}>
              <p className="list-title">{title}</p>
              <div className="content">
                {/* <p></p> */}
                <FaCheck className="check" />
              </div>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .grocery-local {
    background: #d2f4bd;
    margin-bottom: 2rem;
  }

  .grocery-local:hover {
    color: #fff;
    background: #d2f4bd;
    box-shadow: var(--dark-shadow);
  }
  .check {
    font-size: 2rem;
    background: #92da65;
    font-wigth: 400;
    border-radius: 50%;
  }
  .content {
    text-align: center;
  }
  p {
    color: #222;
  }
`;

export default CheckedItemList;
