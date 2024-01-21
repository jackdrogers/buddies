import React, { Fragment, useState } from 'react';
import Grouper from './Grouper';
import Select from 'react-select';
import { Button, Card, Form } from 'react-bootstrap';

const breaks = require('./Breaks.json');

const Break = () => {
  const [groups, setGroups] = useState<any[]>([]);

  const addGroup = () => {
    let obj = [{ question: { value: '' }, is: true, answers: [] }];
    setGroups((prev) => [...prev, obj]);
  };

  const updateGroup = (data: any, id: number) => {
    setGroups((prev) => [...prev.map((c, i) => (i === id ? data : c))]);
  };

  const deleteGroup = (id: number) => {
    setGroups((prev) => [...prev.filter((o, i) => id !== i)]);
  };

  return (
    <Fragment>
      <Card className="p-3">
        <div className="row">
          <div className="col-3">
            <Form.Label>Location</Form.Label>
            <Select
              options={[
                { value: 'uk', label: 'UK' },
                { value: 'china', label: 'China' },
              ]}
            />
          </div>
          <div className="col-3">
            <Form.Label>Flight</Form.Label>
            <Select options={breaks} />
          </div>
          <div className="col-6">
            <div style={{ float: 'right' }}>
              <Button>Save</Button> <Button variant="danger">Discard</Button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="Code" />
          </div>
          <div className="col-3">
            <Form.Label>Saving</Form.Label>
            <Form.Control type="number" placeholder="Price" />
          </div>
          <div className="col-3">
            <Form.Label>Final Price</Form.Label>
            <Form.Control type="text" placeholder="Code" />
          </div>
          <div className="col-3">
            <Form.Label>Code</Form.Label>
            <Form.Control type="text" placeholder="Code" />
          </div>
        </div>
        <hr />
        {groups.map((group, index) => {
          return (
            <Grouper
              group={group}
              key={index}
              updateGroup={updateGroup}
              deleteGroup={deleteGroup}
              index={index}
            />
          );
        })}
        <Button className="mt-3" onClick={addGroup}>
          + Add Condition Group
        </Button>
      </Card>
      <code>
        {JSON.stringify(
          groups.map((e) => {
            return e.map((o: any) => {
              return {
                question: o.question.value,
                answers: o.answers.map((o: any) => o.value),
                is: o.is,
              };
            });
          })
        )}
      </code>
    </Fragment>
  );
};

export default Break;
