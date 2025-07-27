const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http);
const PORT = 3000;
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

app.post('/order', (req, res) => {
    const { menu, name, seat } = req.body;
    console.log(`[주문] ${menu} / 손님: ${name} / 좌석번호: ${seat}`);
    io.emit('newOrder', { menu, name, seat });
    
    res.json({ message: `${name}님, ${menu} 주문이 서버에 도착했습니다!` });
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

http.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});

