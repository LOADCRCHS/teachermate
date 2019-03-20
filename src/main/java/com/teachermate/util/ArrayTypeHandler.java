package com.teachermate.util;


import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import java.sql.*;

@MappedJdbcTypes({JdbcType.VARCHAR})
public class ArrayTypeHandler extends BaseTypeHandler<Object[]> {
    private static final String TYPE_NAME_VARCHAR = "varchar";

    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int parameterIndex, Object[] parameter, JdbcType jdbcType) throws SQLException {
        Connection connection = preparedStatement.getConnection();

        Array array = connection.createArrayOf("VARCHAR", parameter);
        System.out.println("------");
        preparedStatement.setArray(parameterIndex, array);
    }

    @Override
    public Object[] getNullableResult(ResultSet resultSet, String column_name) throws SQLException {
        return getArray(resultSet.getArray(column_name));
    }

    @Override
    public Object[] getNullableResult(ResultSet resultSet, int column_index) throws SQLException {
        return getArray(resultSet.getArray(column_index));
    }

    @Override
    public Object[] getNullableResult(CallableStatement callableStatement, int column_index) throws SQLException {
        return getArray(callableStatement.getArray(column_index));
    }

    private Object[] getArray(Array array) {
        if (array == null) {
            return null;
        }
        try {
            return (Object[]) array.getArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
