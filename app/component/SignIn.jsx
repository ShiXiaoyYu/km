import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import $ from  'jquery';

class SignIn extends React.Component {
    constructor(){
        super();
        this.errorMessage = '';
        this.signData = {};
 /*       const dispatch = this.props.dispatch;*/
        console.log(this.props);
    }

    componentDidMount() {
    }

handleInputData(e){ //处理输入数据
    const dataType = e.target.placeholder;
    if(dataType == 'password'){ //输入密码
        const password = e.target.value.trim();
        this.signData.password = password;//储存密码
        return
    }
    const username = e.target.value.trim();
    //检测是否重名
/*    $.ajax({
        url: 'http://z005.kmtongji.com/api/users',
        type:'GET',
        success:function(data){
            console.log('检测用户是否重名');
            console.log(data);
        },
        error:function(err){
            console.log(err);
        }});*/
    this.signData.username = username;//储存用户名
}

    submitData(){//提交数据（用户名 密码）
        console.log('用户名密码');
        console.log(this.signData.username);
        console.log(this.signData);
        const dispatch = this.props.dispatch;
        //{username:this.signData.username,password:this.signData.password}
        //{username:'1670145451@qq.com',password:'123'}

        //http://z005.kmtongji.com/api/users/setPassword
/* ,crossDomain: true, */
        $.ajax({
            url: 'http://z005.kmtongji.com/api/login',
            type:'POST',
            data:{username:this.signData.username,password:this.signData.password},
            xhrFields:{
                withCredentials: true
            },
            success:function(data){
                console.log('登录成功');
                console.log(data);
                $.ajax({
                    url: 'http://z005.kmtongji.com/api/users',
                    type:'GET',
                    xhrFields:{
                        withCredentials: true
                    },
                    success:function(data){
                      //  console.log('获取已注册或者已登录用户');
                        console.log('重新设置密码');
                        console.log(data);
                    },
                    error:function(err){
                    //    console.log('退出登录');
                        console.log('重设密码faile');
                        console.log(err);
                    }});
             dispatch({
                    type:'LOGIN'
                })
            },
            error:function(err){
                console.log('登录失败');
                console.log(err);
            }});
    }

    render() {
        const dispatch = this.props.dispatch;
        return (
            <div  className={this.props.hide?"hidden":'sign-in'}>
                <form>
                    <input className="sign-in-account" type="email"  placeholder="account"
                        onBlur = {
                        this.handleInputData.bind(this)
                        }
                        />
                    <input className="sign-in-password" type="password"   placeholder="password"
                           onBlur = {
                        this.handleInputData.bind(this)
                        }
                        />
                    <input type="button" className="sign-in-submit" value='Sign in'
                        onClick = {
                        this.submitData.bind(this)
                        }
                        />
                </form>
            </div>
        )
    }
}

export default connect(state =>state)(SignIn);
/*
*
*   <input className="sign-in-account" type="text" ref={node => { Account = node }} placeholder="account"/>
* */