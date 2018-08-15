import React from 'react';

import { schema, normalize } from 'normalizr';

const data = [{
  id: '123',
  t: 100,
  name: 'Jim'
}, {
  id: '456',
  t: 101,
  name: 'Jane'
}];

const userSchema = new schema.Entity('user', {}, { idAttribute: 'id' });
const userListSchema = new schema.Array(userSchema);
const norData = normalize(data, userListSchema);

const About = () => {
  const _data = norData.result.map(id => norData.entities.user[id]);
  return (
    <div>
      {
        _data.map(item => item.name)
      }
    </div>
  );
};

export default About;
