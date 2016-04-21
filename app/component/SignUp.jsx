import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import $ from  'jquery';

class SignUp extends React.Component {
    constructor(){
        super();
     this.dataArr = {};

    }

    componentDidMount() {
    }

    validateInput(e){
        const ff = true;
        const text = e.target.value.trim();
    }
    getInputData(e){
        const  inputDate = e.target.value.trim();
        const dataType = e.target.placeholder;
        const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        switch(dataType){
            case 'nick':
                this.dataArr.nick = inputDate;
                break;
           case 'account':
               if(!emailReg.test(inputDate)){
                  alert('请正确输入邮箱');
                   e.target.style.borderColor='red';
                   return
               }
               console.log('right right right ');
               e.target.style.borderColor='black';
               this.dataArr.username = inputDate;
               break;
           case 'password':
               this.dataArr.password = inputDate;
               break;
            case 'password_re':
                this.dataArr.password_re = inputDate;
                if(this.dataArr.password!=this.dataArr.password_re){
                    alert('两次密码输入不一致请重新输入');
                    e.target.style.borderColor='red';
                    return
                }
               console.log('两次输入一致');
                break;
           default :
               console.log('zzzzzzzzzzzzzzzzzzzzzzz');
               break;
        }
    }
    submitDate(){
        console.log(this.dataArr);
        console.log(this.dataArr.username);
        console.log(this.dataArr.nick);
        console.log(this.dataArr.password);
        const dispatch = this.props.dispatch;
        $.ajax({
                url: 'http://z005.kmtongji.com/api/register',
                type:'POST',
                data:{username:this.dataArr.username,nick:this.dataArr.nick,password:this.dataArr.password},
                success:function(data){
console.log(data);

                    dispatch({
                        type:'LOGIN'
                    })
                },
                error:function(err){
                      console.log(err);
                }}
        );
    }
    render() {
    //    console.log(this.props.hide);
      const dispatch = this.props.dispatch;
        return (
            <div className={this.props.hide?"sign-up":'hidden'}>
                <form method="post">
                    <input  className="sign-up-nick" type="text"
                            onBlur={
                            this.getInputData.bind(this)
                            }
                            placeholder="nick"/>
                    <input  className="sign-up-account" type="email"  onChange ={
                    //控制样式 输入框为红色
                    //获得当前输入字符并通过正则验证
                   this.validateInput.bind(this)
                    }
                            onBlur={
                            this.getInputData.bind(this)
                            }
                            placeholder="account"/>
                    <input  className="sign-up-password" type="password" placeholder="password"
                            onBlur={
                            this.getInputData.bind(this)
                            }
                        />
                    <input  className="sign-up-password_re" type="password" placeholder="password_re"
                            onBlur={
                            this.getInputData.bind(this)
                            }
                        />
                    <input type="button" className="sign-up-submit" value='Sign up'
                          onClick={
                          this.submitDate.bind(this)
                          }
                        />
                    <input value='sign In' className="sign-up-current" />
                </form>
            </div>
        )
    }
}
export default connect(state =>state)(SignUp);