package com.teachermate.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class Sign {
    private Integer id;
    private Date date;
    private Integer isGps;
    private Integer ratio;
    private Integer sign_student_count;
    private boolean isQr;
    private Date close_time;
    private Integer ttl = 299;

}
