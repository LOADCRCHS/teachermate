package com.teachermate.pojo;

import lombok.Data;

@Data
public class SignHistoryDetail {
    private Integer signId;
    private String time;
    private String ratio;
    private Integer order;
    private Integer count;

}
