import React from 'react'

export default props =>
  <>
      <label htmlFor='single'>
        Upload Aadhar/Passport
      </label>
      <div>
        <input type='file' id='single' onChange={props.onChange} />
      </div>
  </>