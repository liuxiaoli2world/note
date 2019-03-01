# JSX

1. Fragement

   ```jsx
   import React, { Component, Fragment } from 'react';
   
   class App extends Component {
     render() {
     	return (
         <Fragment>
           <div>Fragment占位符</div>
           <input type='text'/>
         </Fragment>
       );
     }  
   }
   ```

   

2. jsx 注释

   ```jsx
     render() {
     	return (
         <Fragment>
           {/* 注释一 */}
           {
             // 注释二
           }
           <div>Fragment占位符</div>
           <input type='text'/>
         </Fragment>
       );
     }
   ```

   

3. className

   ```jsx
     render() {
     	return (
         <Fragment>
           <div className='content'>Fragment占位符</div>
           <input type='text'/>
         </Fragment>
       );
     }
   ```

   

4. htmlFor

   ```jsx
     render() {
     	return (
         <Fragment>
           <div>Fragment占位符</div>
           <label htmlFor='insertArea'></label>
           <input id='insertArea' type='text'/>
         </Fragment>
       );
     }
   ```

   

5. dangerouslySetInnerHtml

   ```jsx
     render() {
     	return (
         <Fragment>
           <div>Fragment占位符</div>
           <input type='text' dangerouslySetInnerHtml={{__html:value}} />
         </Fragment>
       );
     }
   ```

   

6. 自定义组件首字母大写，html 标签小写