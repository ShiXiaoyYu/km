import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import $ from  'jquery';

class SignUp extends React.Component {
    constructor() {
        super();
        this.dataArr = {};//存储昵称 用户名等信息（需要传递想后端的信息等）
        this.errMsg = {};
        this.dataArr.isSubmit = 0;//判断是否可以提交数据，正确输入数据+1;
    }

    validateInput(e) {  ////改变type类型并置空value
        const getType = e.target.placeholder;
        if(getType == 'account'||getType == 'nick'){
            e.target.type = 'text';
            e.target.value = '';
            return
        }
        e.target.type = 'password';
        e.target.value = '';
    }

    getInputData(e) { //处理input标签输入数据
        const inputDate = e.target.value.trim();
        const dataType = e.target.placeholder;
        const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;


        switch (dataType) {  //判断input标签placeholder 进行输入校验，数据存储等逻辑判断

            case 'nick': //昵称
                if (!(e.target.value)) {  //输入为空
                    e.target.value = '请输入昵称';
                    e.target.color = 'red';
                    e.target.style.borderColor = 'red';
                    return
                }
                this.errMsg.isSubmit = true;
                this.dataArr.nick = inputDate;//存储昵称
                e.target.style.borderColor = 'black';
                this.dataArr.isSubmit += 1;//正确输入昵称+1
                break;
            case 'account': //邮箱输入  检测：邮箱格式 是否为空


                if (!emailReg.test(inputDate) || !(e.target.value)) { //邮箱与非空检测处理
                    //  alert('请正确输入邮箱');
                    //邮箱格式不对
                    this.errMsg.isSubmit = false;
                    console.log('邮箱格式不对');
                    this.errMsg.isEmailFormat = true;
                    e.target.value = '请正确输入邮箱';
                    e.target.color = 'red';
                    e.target.style.borderColor = 'red';
                    return
                }

                $.ajax({  //后端验证问题 需要session 解决1.沟通 给匿名权限 临时申请一个session 2.后端不判断session
                        url: 'http://z005.kmtongji.com/api/users',
                        type: 'GET',
                        success: function (data) {
                            //重复注册
                            this.errMsg.isEmailFormat = false;
                            this.errMsg.isEmail = true;
                            console.log(data);
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    }
                );
                e.target.style.borderColor = 'black';
                this.dataArr.username = inputDate; //存储用户名
                this.dataArr.isSubmit += 1;//正确输入用户名+1
                break;
            case 'password': //非空检验
                if (!(e.target.value)) { //密码为空
                    e.target.value = '请输入密码';
                    e.target.type = 'text';
                    e.target.color = 'red';
                    e.target.style.borderColor = 'red';
                    return
                }
                e.target.style.borderColor = 'black';
                this.dataArr.password = inputDate; //存储密码
                this.dataArr.isSubmit += 1;//正确输入用户名+1
                break;
            case 'password_re': //1.两次密码输入是否一致2.是否为空
                if (!(e.target.value)) { //为空
                    e.target.value = '请再次输入密码';
                    e.target.type = 'text';
                    e.target.color = 'red';
                    e.target.style.borderColor = 'red';
                    return
                }
                this.dataArr.password_re = inputDate;
                if (this.dataArr.password != this.dataArr.password_re) {
                    console.log('两次输入不一致');
                    e.target.type = 'text';
                    e.target.value = '两次密码输入不一致';
                    console.log(e.target.placeholder);
                    e.target.style.borderColor = 'red';
                    return
                }
                e.target.style.borderColor = 'black';
                this.dataArr.password_re = inputDate;
                this.dataArr.isSubmit += 1;//正确输入用户名+1
                break;
            default :
                break;
        }
    }

    submitDate() {
        const self = this;
        const dispatch = this.props.dispatch;

        if (( this.dataArr.username)&&(this.dataArr.nick)&&(this.dataArr.password)&&(this.dataArr.password_re)) { // 注册请求
            $.ajax({
                    url: 'http://z005.kmtongji.com/api/register',
                    type: 'POST',
                    xhrFields: {
                        withCredentials: true
                    },
                    data: {username: this.dataArr.username, nick: this.dataArr.nick, password: this.dataArr.password},
                    success: function (data) {
                        console.log(data);
                        //成功注册并登录   isSubmit = 0；
                        self.dataArr.isSubmit = 0;//正确输入用户名+1

                        dispatch({ //注册并成功登陆后 显示主页
                            type: 'LOGIN'
                        })
                    },
                    error: function (err) {
                        console.log(err);
                    }
                }
            );
        } else {
            (function () { //不能注册 返回错误信息
                if (!(self.dataArr.nick)) {
                    $('.sign-up input').eq(0).val('请输入用户名');
                    $('.sign-up input').eq(0).css('borderColor', 'red');
                }
                if (!(self.dataArr.username)) {
                    $('.sign-up input').eq(1).val('请输入邮箱');
                    $('.sign-up input').eq(1).css('borderColor', 'red');
                }
                if (!(self.dataArr.password)) {
                    $('.sign-up input').eq(2).val('请输入密码').attr('type', 'text');
                    $('.sign-up input').eq(2).css('borderColor', 'red');
                }
                if (!(self.dataArr.password_re)) {
                    $('.sign-up input').eq(3).val('请再次输入密码').attr('type', 'text');
                    $('.sign-up input').eq(3).css('borderColor', 'red');
                }
            })();
            return
        }
    }

    render() {
        const dispatch = this.props.dispatch;
        return (
            <div className={this.props.hide?"sign-up":'hidden'}>
                <form method="post">
                    <input className="sign-up-nick" type="text"
                           onClick = {
                   this.validateInput.bind(this)
                   }
                           onBlur={
                            this.getInputData.bind(this)
                            }

                           placeholder="nick"/>
                    <input className="sign-up-account" type="email"
                   onClick = {
                   this.validateInput.bind(this)
                   }
                           onBlur={
                            this.getInputData.bind(this)
                                     }

                           placeholder="account"/>
                    <input className="sign-up-password" type="password" placeholder="password"
                           onClick = {
                   this.validateInput.bind(this)
                   }

                           onBlur={
                            this.getInputData.bind(this)
                                                    }
                        />
                    <input className="sign-up-password_re" type="password" placeholder="password_re"
                           onBlur={
                            this.getInputData.bind(this)
                            }
                           onClick = {
                   this.validateInput.bind(this)
                   }

                        />
                    <input type="button" className="sign-up-submit" value='Sign up'
                           onClick={
                          this.submitDate.bind(this)
                          }
                        />
                    <input placeholder='sign In' className="sign-up-current"/>
                </form>
            </div>
        )
    }
}
export default connect(state =>state)(SignUp);