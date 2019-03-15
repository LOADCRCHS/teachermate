package com.teachermate.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class SignInfo {
    @JsonFormat(pattern = "yyyy-mm-dd", timezone = "GMT+8")
    private Date date;
    private String count;
    private List<SignInfoDetail> signHistoryDetail;
    private boolean isGps;
    //private boolean isWx;

}
