package com.teachermate.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

@RestController
public class SeatController {

    @RequestMapping("getCurrentSeatInfo")
    public Map getCurrentSeatInfo(Integer courseId){

        return null;
    }

}
