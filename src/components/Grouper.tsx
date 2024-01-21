import React, { Fragment, FunctionComponent, useEffect, useState } from 'react';
import Condition from './Condition/Condition';
import { Button, Card } from 'react-bootstrap';
import { createDiffieHellmanGroup } from 'crypto';

const Grouper: FunctionComponent<any> = ({
  index,
  group,
  updateGroup,
  deleteGroup,
}) => {
  const [conditions, setConditions] = useState<any[]>(group);

  const addCondition = () => {
    setConditions((prev) => [
      prev,
      {
        question: { value: '' },
        is: true,
        answers: [],
      },
    ]);
  };

  const updateCondition = (data: any, id: number) => {
    setConditions((prev) => prev.map((c, i) => (i === id ? data : c)));
  };

  const deleteCondition = (id: number) => {
    setConditions((prev) => prev.filter((o, i) => id !== i));
  };

  useEffect(() => setConditions(group), [group]);
  useEffect(() => updateGroup(conditions, index), [conditions]);

  return (
    <Fragment>
      {index > 0 && <div className="text-center my-3">OR</div>}
      <Card className="p-3">
        {conditions.map((condition: any, i: number): any => {
          return (
            <Condition
              data={condition}
              updateCondition={updateCondition}
              deleteCondition={deleteCondition}
              index={i}
              key={i}
            />
          );
        })}
        <div>
          <Button onClick={addCondition}>+ Add Condition</Button>{' '}
          <Button onClick={() => deleteGroup(index)} variant="danger">
            - Delete Group
          </Button>
        </div>
      </Card>
    </Fragment>
  );
};

export default Grouper;
