from .auth import router as auth_router
from .bookings import router as book_router
from .services import router as service_router


routers = [
    (auth_router, "/auth", ["Authentication"]),
    (book_router, "/book", ["Bookings"]),
    (service_router, "/service", ["Services"]),
 
]