package com.teachermate.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class Sign {
    private Integer id;
    private Date date;
    private Integer gps;
    private Integer sign_student_count;
    private Date close_time;


    public void setGps(Boolean is_gps) {
        this.gps = is_gps ? 1 : 0;
    }
}
