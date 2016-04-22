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

    init(){

    }


    handleInputData(e){ //处理输入数据

    const dataType = e.target.placeholder; //
    const inputDate = e.target.value.trim();//获得输入数据
    const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

    if(dataType == 'password'){ //输入密码
        if(!(e.target.value)){
            e.target.value = '请正确输入密码';
            e.target.type = 'text';
            e.target.color = 'red';
            e.target.style.borderColor = 'red';
        }
        const password = e.target.value.trim();
        this.signData.password = password;//储存密码
        return
    }

  //  const username = e.target.value.trim();

    if (!emailReg.test(inputDate)||!(e.target.value)) { //  输入账户 判断1.邮箱格式2.是否为空
        e.target.value = '请正确输入邮箱';
        e.target.color = 'red';
        e.target.type = 'text';
        e.target.style.borderColor = 'red';
        return
    }

    e.target.style.borderColor = 'black';
    this.signData.username = inputDate;//储存用户名
}

    submitData(){//提交数据（用户名 密码）
        console.log('用户名密码');
        console.dir(this.signData);
        const self = this;
        if( ( this.signData.username)&&(this.signData.password)){
            const dispatch = this.props.dispatch;
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
                    if(data.errno == '-100'){
                            $('.sign-in input').eq(1).val('账号或者密码错误').attr('type','text');
                            $('.sign-in input').eq(1).css('borderColor','red');
                        return
                    }
                    dispatch({ //登录成功 显示主页
                        type:'LOGIN'
                    });
              /*      $.ajax({
                        url: 'http://z005.kmtongji.com/api/users',
                        type:'GET',
                        xhrFields:{
                            withCredentials: true
                        },
                        success:function(data){
                            console.log('获取已注册或者已登录用户');
                            console.log(data);
                        },
                        error:function(err){
                            console.log(err);
                        }});*/

                },
                error:function(err){
                    console.log('登录失败');
                    console.log(err);
               }})}else{ //返回错误信息

            if(!(self.signData.username)){
                $('.sign-in input').eq(0).val('请输入邮箱');
                $('.sign-in input').eq(0).css('borderColor','red');
            }
            if(!(self.signData.password)){
                $('.sign-in input').eq(1).val('请输入密码').attr('type','text');
                $('.sign-in input').eq(1).css('borderColor','red');
            }
        }


    }

    render() {
        const dispatch = this.props.dispatch;
        return (
            <div  className={this.props.hide?"hidden":'sign-in'}>
                <form>
                    <input className="sign-in-account" type="email"  placeholder="account"
                           onClick = {
                   this.validateInput.bind(this)
                   }
                        onBlur = {
                        this.handleInputData.bind(this)
                        }
                        />
                    <input className="sign-in-password" type="password"   placeholder="password"
                           onClick = {
                   this.validateInput.bind(this)
                   }
                           onBlur = {
                        this.handleInputData.bind(this)
                        }
                        />
                    <input type="button" className="sign-in-submit"  value='Sign in'
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
