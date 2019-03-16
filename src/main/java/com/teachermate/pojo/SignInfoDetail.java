package com.teachermate.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

@Data
public class SignInfoDetail {
    private Integer id;
    @JsonFormat(pattern = " HH:mm", timezone = "GMT+8")
    private String time;
    private String ratio;
    private Integer count;
    private Integer order;

}
