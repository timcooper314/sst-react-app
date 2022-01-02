from pytest import fixture
from unittest.mock import MagicMock
from src.api_endpoint_lambda import GetTracksData


@fixture
def sample_s3_obj():
    return {"1": {"track_1": "Artist_1"}, "2": {"track_2": "Artist_2"}}


@fixture
def expected_processed_data():
    return [
        {
            "id": 1,
            "artist": "Artist_1",
            "track": "track_1"
        },
        {
            "id": 2,
            "artist": "Artist_2",
            "track": "track_2"
        }
        ]


@fixture
def obj():
    obj = GetTracksData.__new__(GetTracksData)
    obj.s3 = MagicMock()
    obj.tracks_data_bucket_name = 'test-bucket'
    return obj


def test_should_process_data(obj, sample_s3_obj, expected_processed_data):
    processed_data = obj.process_s3_data(sample_s3_obj)
    assert processed_data == expected_processed_data
