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
        return "question";
    }

    @RequestMapping("sign")
    public String sign() {
        return "sign";
    }

    @RequestMapping("seat")
    public String seat(){
        return "seat";
    }

    @RequestMapping("current_seat")
    public String current_seat(){
        return "current_seat";
    }

    @RequestMapping("seat_add")
    public String seat_add(){
        return "seat_add";
    }

    @RequestMapping("seat_update")
    public String seat_update(){
        return "seat_update";
    }
}
