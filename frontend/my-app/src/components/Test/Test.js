import React from "react";
import "./Test.css";

const Test = () => {
    return (
        <div className="form">
            <div className="div-flex">
                <div className="div" />
                <div className="div-header">
                    <div className="heading-welcome">Welcome to Crysis!</div>
                    <p className="text-wrapper">Got a crises? Get Crysis!</p>
                </div>
                <div className="div-block-wrapper">
                    <div className="div-block">
                        <div className="div-marginbottom">
                            <div className="label">
                                <div className="text-wrapper-2">EMAIL OR</div>
                                <div className="text-wrapper-3">*</div>
                            </div>
                            <div className="div-2" />
                        </div>
                        <div className="div-3">
                            <div className="label-2">
                                <div className="text-wrapper-2">PASSWORD</div>
                                <div className="text-wrapper-3">*</div>
                            </div>
                            <div className="div-2" />
                        </div>
                        <button className="button">
                            <div className="div-contents">
                                <div className="text-wrapper-4">Log In</div>
                            </div>
                        </button>
                        <div className="div-margintop">
                            <div className="text-wrapper-5">
                                Need an account?
                            </div>
                            <button className="div-wrapper">
                                <div className="text-wrapper-6">Sign up</div>
                            </button>
                        </div>
                        <div className="text-wrapper-7">
                            Forgot your password?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;
