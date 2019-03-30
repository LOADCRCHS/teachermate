package com.teachermate.controller;

import com.teachermate.service.SeatService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class SeatController {

    private SeatService seatService;

    @RequestMapping("getCurrentSeatInfo")
    public Map getCurrentSeatInfo(Integer courseId){

        return null;
    }

    @RequestMapping("save_seat")
    public Map save_seat(){
        return null;
    }

}
