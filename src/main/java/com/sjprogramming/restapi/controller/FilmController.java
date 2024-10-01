package com.sjprogramming.restapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sjprogramming.restapi.entity.Film;
import com.sjprogramming.restapi.service.FilmService;

@RestController
@RequestMapping("/api/films")
public class FilmController {

    @Autowired
    private FilmService filmService;

    @GetMapping
    public List<Film> getAllFilms() {
        return filmService.getAllFilms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Film> getFilmById(@PathVariable Long id) {
        Film film = filmService.getFilmById(id);
        return film != null ? ResponseEntity.ok(film) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Film createFilm(@RequestBody Film film) {
        return filmService.saveFilm(film);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Film> updateFilm(@PathVariable Long id, @RequestBody Film film) {
        Film existingFilm = filmService.getFilmById(id);

        if (existingFilm == null) {
            return ResponseEntity.notFound().build();
        }

        // Update only the specified fields
        existingFilm.setTitre(film.getTitre());
        existingFilm.setDescription(film.getDescription());
        if (film.getGenre() != null) {
            existingFilm.setGenre(film.getGenre());
        }

        Film updatedFilm = filmService.saveFilm(existingFilm);
        return ResponseEntity.ok(updatedFilm);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFilm(@PathVariable Long id) {
        filmService.deleteFilm(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/genre/{genreId}")
    public List<Film> getFilmsByGenre(@PathVariable Long genreId) {
        return filmService.getFilmsByGenre(genreId);
    }

}
