package utils

import "github.com/gofiber/fiber"

func ErrorMap(err error) *fiber.Map {
	return &fiber.Map{
		"errors": err.Error(),
	}
}
