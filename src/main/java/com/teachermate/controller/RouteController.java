package com.teachermate.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RouteController {
    @RequestMapping("/")
    public String index() {
        return "index";
    }

    @RequestMapping("pet")
    public String pet() {
        return "pet";
    }

    @RequestMapping("question_detail")
    public String question() {
        return "question_detail";
    }

    @RequestMapping("sign")
    public String sign() {
        return "sign";
    }
}
