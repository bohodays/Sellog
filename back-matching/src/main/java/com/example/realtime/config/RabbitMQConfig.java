package com.example.realtime.config;

import com.example.realtime.dto.MatchingDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.listener.RabbitListenerContainerFactory;
import org.springframework.amqp.support.converter.MessageConversionException;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.UnsupportedEncodingException;

/**
 * 역직렬화
 * **/
@Slf4j
@Configuration
public class RabbitMQConfig {

    @Bean
    public RabbitListenerContainerFactory<?> rabbitListenerContainerFactory(ConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(new MessageConverter() {
            @Override
            public Message toMessage(Object object, MessageProperties messageProperties) throws MessageConversionException {
                return null;
            }

            @Override
            public Object fromMessage(Message message) throws MessageConversionException {
                log.info("rabbitmq 전송 받음 : {}",message);
                if ("text/plain".equals(message.getMessageProperties().getContentType())) {
                    // 문자열 메시지인 경우
                    try {
                        return new String(message.getBody(), "UTF-8");
                    } catch (UnsupportedEncodingException e) {
                        throw new MessageConversionException("Failed to convert message body to string", e);
                    }
                } else if ("application/x-java-serialized-object".equals(message.getMessageProperties().getContentType())) {
                    // 직렬화된 객체인 경우
                    try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(message.getBody()))) {
                        return (MatchingDto) ois.readObject();
                        // 역직렬화할때 받는 쪽에서 패키지 이름이 같아야 한다.... com.example.realtime
                    } catch (IOException | ClassNotFoundException e) {
                        throw new MessageConversionException("Failed to deserialize object", e);
                    }
                } else {
                    throw new MessageConversionException("Unsupported message content type: " + message.getMessageProperties().getContentType());
                }
            }
        });

        return factory;
    }
}
