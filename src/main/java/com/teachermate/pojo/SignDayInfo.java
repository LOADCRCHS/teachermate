package com.teachermate.pojo;

import lombok.Data;

import java.util.List;

@Data
public class SignDayInfo {
    private String date;
    private String count;
    private List<SignHistoryDetail> signHistoryDetail;
    private Integer order;

}
