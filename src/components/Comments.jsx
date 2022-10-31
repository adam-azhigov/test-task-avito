import React from 'react';


function Comments({comm}) {
    return (
        <div>
            <div className='p-10'>
                 <div>{comm.by}</div>
                <div dangerouslySetInnerHTML={{__html: comm.text}} className='ml-5 mt-5'></div>
            </div>

        </div>
    );
}

export default Comments;