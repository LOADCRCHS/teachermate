package com.teachermate.controller;

import com.teachermate.pojo.Seat;
import com.teachermate.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class SeatController {
    @Autowired
    private SeatService seatService;

    @RequestMapping("getCurrentSeatInfo")
    public List<Seat> getCurrentSeatInfo(Integer courseId){

        return seatService.selectByCourseId(courseId);
    }

    @RequestMapping("save_seat")
    public Map save_seat(Seat seat){
        Map<String,Object> result = new HashMap<>();
        seatService.create(seat);
        result.put("code","1000");
        return result;
    }

}
