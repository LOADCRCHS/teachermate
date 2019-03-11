package com.teachermate.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class Sign {
    private Integer id;
    //@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date date;
    private Integer isGps;
    private Integer ratio;
    private Integer sign_student_count;
    private boolean isQr;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date close_time;
    private Integer ttl = 299;
    private String tpl;
    private List<SignDistribution> signDistribution = new ArrayList<>();
}
