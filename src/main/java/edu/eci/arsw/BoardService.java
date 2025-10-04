package edu.eci.arsw;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import org.springframework.stereotype.Service;

@Service
public class BoardService {
    private final CopyOnWriteArrayList<Stroke> strokes = new CopyOnWriteArrayList<>();

    public List<Stroke> getStrokesSnapshot() {
        return Collections.unmodifiableList(new ArrayList<>(strokes));
    }

    public void addStroke(Stroke s) {
        strokes.add(s);
    }

    public void clear() {
        strokes.clear();
    }
}
