package com.teachermate.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/course/")
public class CourseController {
    @RequestMapping("his_sign/{id}")
    public String his_sign(@PathVariable Integer id){
        return "{\"data\":{\"date\":\"2019-02-27 22:20:24\",\"sign_student_count\":\"0\",\"ratio\":\"0\",\"gps\":\"0\",\"isQr\":false,\"order\":3,\"tpl\":\"<div class=\\\"student-contaner\\\">\\n\\t<div class=\\\"delete-btn\\\">\\n\\t\\t<i class=\\\"icon icon-delete\\\"><\\/i>\\n\\t\\t\\u5220\\u9664\\u672c\\u6b21\\u7b7e\\u5230\\n\\t<\\/div>\\n\\t<section class=\\\"student-info\\\">\\n\\t\\t<p class=\\\"sign-title\\\">\\u672c\\u6b21\\u7b7e\\u5230\\u5f00\\u542f\\u4e8e 2019-02-27 22:20:24<\\/p>\\n\\t\\t<div class=\\\"sign-info grey-text\\\">\\n\\t\\t\\t<p>\\u51fa\\u52e4<\\/p>\\n\\t\\t\\t<p class=\\\"grey-text text-darken-2\\\">\\n\\t\\t\\t\\t<span class=\\\"sign-num\\\">0<\\/span>\\u4eba\\n\\t\\t\\t<\\/p>\\n\\t\\t<\\/div>\\n\\t\\t<div class=\\\"sign-info grey-text\\\">\\n\\t\\t\\t<p>\\u51fa\\u52e4\\u7387<\\/p>\\n\\t\\t\\t<p class=\\\"grey-text text-darken-2\\\">\\n\\t\\t\\t\\t<span class=\\\"sign-num\\\">0<\\/span>%\\n\\t\\t\\t<\\/p>\\n\\t\\t<\\/div>\\n\\t\\t<div class=\\\"sign-info grey-text\\\">\\n\\t\\t\\t<p>\\u7b7e\\u5230\\u5f00\\u542f\\u65f6\\u957f<\\/p>\\n\\t\\t\\t<p class=\\\"grey-text text-darken-2\\\">\\n\\t\\t\\t\\t<span class=\\\"sign-num\\\">0<\\/span>\\u5206<span class=\\\"sign-num\\\">5<\\/span>\\u79d2\\n\\t\\t\\t<\\/p>\\n\\t\\t<\\/div>\\n\\t<\\/section>\\n\\t<ul class=\\\"student-list\\\">\\n\\t\\t\\t<\\/ul>\\n\\t<div class=\\\"long-line hidden\\\"><\\/div>\\n\\t<ul class=\\\"rest-list\\\">\\n\\t\\t\\t<\\/ul>\\n\\t<div class=\\\"no-sign-list\\\">\\n\\t\\t<h3>\\n    <\\/h3>\\n<ul>\\n<\\/ul>\\n\\n\\t<\\/div>\\n<\\/div>\",\"signDistribution\":{}},\"msg\":\"success\"}";
    }
}
