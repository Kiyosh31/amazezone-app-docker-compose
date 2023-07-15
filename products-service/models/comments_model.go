package models

type CommentsModel struct {
	UserId  string `json:"userId"`
	Name    string `json:"userName"`
	Comment string `json:"comment"`
	Stars   int64  `json:"stars"`
}
