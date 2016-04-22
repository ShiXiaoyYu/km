import React from 'react';
import ReactDOM from 'react-dom';
import $ from  'jquery'
import { connect } from 'react-redux';
//组件



class MainIndex extends React.Component {
    constructor(){
        super();
        this.state = {hidden : false};
        this.submitData = {}
    }

    validateInput(e) {  ////改变type类型并置空value
        e.target.type = 'password';
        e.target.value = '';
    }

    submitLogOut(){
        const dispatch = this.props.dispatch;

        $.ajax({
            url: 'http://z005.kmtongji.com/api/logout',
            type:'GET',
            xhrFields:{
                withCredentials: true
            },
            success:function(data){
                console.log('退出登录');
                console.log(data);
                dispatch({ //登录成功 显示主页
                    type:'LOGIN'
                });
            },
            error:function(err){
                console.log('退出登录失败');
                console.log(err);
            }});
    }

    getInputData(e){
        if(!(e.target.value)){
            e.target.value = '请输入修改密码';
            e.target.value = 'text';
            e.target.color = 'red';
            e.target.style.borderColor = 'red';
            return
        }
        const dataType = e.target.placeholder; //
        const inputDate = e.target.value.trim();//获得输入数据
        this.submitData.password = inputDate;//储存密码
        e.target.style.borderColor = 'black';

    }
    passwordChange(){
        const  self = this;
        $.ajax({
            url: 'http://z005.kmtongji.com/api/users/setPassword',
            type:'POST',
            data:{password: self.submitData.password},
            xhrFields:{
                withCredentials: true
            },
            success:function(data){
                alert('修改密码成功');
                console.log('修改密码成功');
                console.log(data);
            },
            error:function(err){
                console.log('修改密码失败');
                console.log(err);
            }});
    }

    render() {
        const isHide = this.props.handleSign.isHide;
        const dispatch = this.props.dispatch;
        console.log('isHide');
        console.log(isHide);
        return (
            <div className={isHide?'main-index':'hidden'}>
                <form className='mainIndex'>
                    <input className='mainIndex-out' type='button' value='退出登录'

                           onClick={
                               this.submitLogOut.bind(this)
                        }
                        />

                    <input className = 'mainIndex-password' type='text' placeholder = '修改密码'
                           onClick={
                               this.validateInput.bind(this)
                        }
                           onBlur = {
                               this.getInputData.bind(this)
                         }
                        />
                    <input className='mainIndex-re' type='button' value='确认'
                           onClick = {
                             this.passwordChange.bind(this)
                         }
                        />
                </form>
            </div>
        )
    }
}

/*
 * "signUi-up"
 * */

export default connect(state =>state)(MainIndex);