package com.teachermate.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/")
public class UserController {
    @RequestMapping("/delete_sign")
    public String delete_sign(String sign_id) {
        //todo 正确的删除跳转
        return "{\"data\":[],\"msg\":\"delete success\"}";
    }
}
