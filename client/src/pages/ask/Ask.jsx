import React from 'react'

function Ask() {
  return (
    <>
        <p>Steps to write a good question.</p>
        <ul>
            <li>1, Something</li>
            <li>2, Something</li>
            <li>3, Something</li>
        </ul>
        <p>Post your question</p>
        <div>
            <input type="text" name="" id="" placeholder='Question title'/> <br /> <br />
            <textarea name="" id="" rows={7} cols={47} placeholder='Question description'></textarea>
        </div>
    </>
  )
}

export default Ask