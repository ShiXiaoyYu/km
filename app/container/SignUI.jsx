import React from 'react';
import ReactDOM from 'react-dom';
import $ from  'jquery'
import { connect } from 'react-redux';
//组件
import SignUp  from  '../component/SignUp.jsx';
import SignIn  from '../component/SignIn.jsx';


class SignUI extends React.Component {
    constructor(){
        super();
        this.state = {hidden : false};
    }
    componentDidMount() {
        console.log('iside');
        const store = this.props.store;
        console.log(store);
    }


    render() {
       // const isHide = this.props.store.isHide;

        const isHide = this.props.handleSign.isHide;
        const dispatch = this.props.dispatch;
        console.log(this.props);
        console.log(isHide);
        return (
            <div className={isHide?'hidden':"signUi-up-in"}>
                    <div className="singn-UI-wrap"></div>


                    <form className='main-sign'>
                        <input className='main-sign-up' type='button' value='登录'
                               onClick={
                        ()=>{
                        console.log('登录');
                          this.state = {hidden:false};
                        this.forceUpdate();
                          console.log(this.state);
                        }

                        }
                            />
                        <input className='main-sign-in' type='button' value='注册'
                               onClick = { ()=>{
                         console.log('注册');
                          this.state = {hidden:true};
                      this.forceUpdate();
                          console.log(this.state);
                         }

                         }
                            />
                    </form>

                    <SignUp hide= {this.state.hidden}  />
                    <SignIn hide = {this.state.hidden} />
            </div>
        )
    }
}

/*
* "signUi-up"
* */

export default connect(state =>state)(SignUI);