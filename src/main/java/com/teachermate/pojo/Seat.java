package com.teachermate.pojo;

import lombok.Data;

@Data
public class Seat {
    private Integer id;
    private Integer courseId;
    private String seatArray;
    private String courseAddress;
}
