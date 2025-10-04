package edu.eci.arsw;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    @Resource
    private HttpServletRequest request;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping
    public Map<String,Object> getBoard() {
        Map<String,Object> resp = new HashMap<>();
        resp.put("strokes", boardService.getStrokesSnapshot());
        resp.put("color", colorForSession());
        return resp;
    }

    @PostMapping("/stroke")
    public Map<String,String> addStroke(@RequestBody Stroke s) {
        boardService.addStroke(s);
        return Map.of("status","ok");
    }

    @PostMapping("/clear")
    public Map<String,String> clear() {
        boardService.clear();
        return Map.of("status","cleared");
    }

    private String colorForSession() {
        String sid = request.getSession(true).getId();
        int hash = Math.abs(sid.hashCode());
        int r = (hash & 0xFF0000) >> 16;
        int g = (hash & 0x00FF00) >> 8;
        int b = (hash & 0x0000FF);
        // asegurar que el color no sea muy claro ni muy oscuro
        r = 80 + (r % 176);
        g = 80 + (g % 176);
        b = 80 + (b % 176);
        return String.format("#%02X%02X%02X", r, g, b);
    }
}
