package com.teachermate.util;


import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;

import java.sql.*;

@MappedJdbcTypes({JdbcType.VARCHAR})
public class ArrayTypeHandler extends BaseTypeHandler<Object[]> {
    private static final String TYPE_NAME_VARCHAR = "varchar";

    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int parameterIndex, Object[] parameter, JdbcType jdbcType) throws SQLException {
        StringBuilder str_param = new StringBuilder();
        for (Object str : parameter) {
            str_param.append(str);
            //todo 需要一个手写不出来的符号做分割符
            str_param.append(",");
        }
        str_param.delete(str_param.length() - 1, str_param.length());
        preparedStatement.setString(parameterIndex, str_param.toString());
    }

    @Override
    public Object[] getNullableResult(ResultSet resultSet, String column_name) throws SQLException {
        return getArray(resultSet.getString(column_name));
    }

    @Override
    public Object[] getNullableResult(ResultSet resultSet, int column_index) throws SQLException {
        return getArray(resultSet.getString(column_index));
    }

    @Override
    public Object[] getNullableResult(CallableStatement callableStatement, int column_index) throws SQLException {
        return getArray(callableStatement.getString(column_index));
    }

    private Object[] getArray(String str) {
        if (str == null) {
            return null;
        }
        return str.split(",");
    }
}
