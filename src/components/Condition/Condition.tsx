import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';

const questions = require('./questions.json');

const Condition: FunctionComponent<any> = ({
  data,
  updateCondition,
  deleteCondition,
  index,
}) => {
  const answerRef = useRef<any>();
  const questionRef = useRef<any>();

  const checkRef = (e: any) => {
    updateCondition(
      {
        question: e,
        is: data.is,
        answers: [],
      },
      index
    );
  };

  const updateAnswers = (newValue: any, event: any) => {
    if (event.action === 'select-option' || event.action === 'remove-value') {
      updateCondition(
        {
          question: questionRef.current.getValue()[0],
          is: data.is,
          answers: newValue,
        },
        index
      );
    }
  };

  const updateIs = () => {
    updateCondition(
      {
        question: questionRef.current.getValue()[0],
        is: !data.is,
        answers: answerRef.current.getValue(),
      },
      index
    );
  };

  let as = [];
  if (data.question) {
    as = questions
      .filter((e: any) => e.value === data.question.value)[0]
      .answers.map((e: any) => ({ value: e, label: e }));
  }

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-5">
          <Select
            value={questions.filter(
              (e: any) => e.value === data.question.value
            )}
            ref={questionRef}
            onChange={checkRef}
            options={questions}
          />
        </div>
        <div className="col-2 text-center">
          <Button
            variant="secondary"
            style={{ width: '100%' }}
            onClick={updateIs}
          >
            {data.is ? 'Is' : 'Is Not'}
          </Button>
        </div>
        <div className="col-4">
          {data.question.value === '' ? (
            <Select ref={answerRef} isDisabled />
          ) : (
            <Select
              isMulti={as.length > 2}
              defaultValue={data.answers}
              value={data.answers}
              ref={answerRef}
              isDisabled={data.question.value === ''}
              onChange={updateAnswers}
              options={as}
            />
          )}
        </div>
        <div className="col-1">
          <Button variant="danger" onClick={() => deleteCondition(index)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Condition;
