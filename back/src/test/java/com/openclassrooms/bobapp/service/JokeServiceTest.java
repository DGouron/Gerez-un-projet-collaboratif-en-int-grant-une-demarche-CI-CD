package com.openclassrooms.bobapp.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.openclassrooms.bobapp.data.JsonReader;
import com.openclassrooms.bobapp.model.Joke;

@ExtendWith(MockitoExtension.class)
class JokeServiceTest {

    @Mock
    private JsonReader jsonReader;

    private JokeService jokeService;

    @BeforeEach
    void setUp() {
        jokeService = new JokeService(jsonReader);
    }

    @Test
    void getRandomJoke_should_return_joke_from_json_reader() {
        // Arrange
        Joke joke1 = new Joke();
        joke1.setJoke("Why don't scientists trust atoms? Because they make up everything!");
        
        Joke joke2 = new Joke();
        joke2.setJoke("Parallel lines have so much in common. It's a shame they'll never meet.");
        
        List<Joke> jokes = Arrays.asList(joke1, joke2);
        when(jsonReader.getJokes()).thenReturn(jokes);

        // Act
        Joke result = jokeService.getRandomJoke();

        // Assert
        assertNotNull(result);
        assertTrue(jokes.contains(result));
        verify(jsonReader, times(1)).getJokes();
    }

    @Test
    void getRandomJoke_should_return_only_joke_when_single_joke_available() {
        // Arrange
        Joke joke = new Joke();
        joke.setJoke("Single joke for testing");
        
        List<Joke> jokes = Arrays.asList(joke);
        when(jsonReader.getJokes()).thenReturn(jokes);

        // Act
        Joke result = jokeService.getRandomJoke();

        // Assert
        assertNotNull(result);
        assertEquals(joke, result);
        assertEquals("Single joke for testing", result.getJoke());
        verify(jsonReader, times(1)).getJokes();
    }
} 