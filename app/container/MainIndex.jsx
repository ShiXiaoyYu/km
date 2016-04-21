import React from 'react';
import ReactDOM from 'react-dom';
import $ from  'jquery'
import { connect } from 'react-redux';
//组件



class MainIndex extends React.Component {
    constructor(){
        super();
        this.state = {hidden : false};
    }
    componentDidMount() {

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

                        ()=>{
                         $.ajax({
            url: 'http://z005.kmtongji.com/api/logout',
            type:'GET',
             xhrFields:{
                        withCredentials: true
                    },
            success:function(data){
                console.log('退出登录');
                console.log(data);
                     $.ajax({
            url: ' http://z005.kmtongji.com/api/users',
            type:'GET',
             xhrFields:{
                        withCredentials: true
                    },
            success:function(data){
                console.log('获取已登录用户');
                console.log(data);
            },
            error:function(err){
                console.log('获取已登录用户失败');
                console.log(err);
            }});
            },
            error:function(err){
                console.log('退出登录失败');
                console.log(err);
            }});



                        }}
                        />
                    <input className='mainIndex-re' type='button' value='修改密码'
                           onClick = {
                           ()=>{
                           //这个可能写错了  最后再修改

                          // console.log('修改后的密码为：'+this.signData.password);
                  $.ajax({
            url: 'http://z005.kmtongji.com/api/users/setPassword',
            type:'POST',
            data:{password:'456'},
             xhrFields:{
                        withCredentials: true
                    },
            success:function(data){
                console.log('修改密码成功');
                console.log(data);
            },
            error:function(err){
                console.log('修改密码失败');
                console.log(err);
            }});
                         }}
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